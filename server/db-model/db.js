const mysql = require('mysql2');
const dotenv = require('dotenv');
const { log } = require('console');
const { restart } = require('nodemon');

dotenv.config();

module.exports = class MySql {
    constructor() {
        if (this instanceof MySql) {
            throw new Error('A static class cannot be instantiated');
        }
    }
    static pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,

    }).promise();


    static processDataObjsToArray(objsArr, keys) {

        return objsArr.map(obj =>
            keys.map(key => {
                if (obj[key] || obj[key] === 0) return obj[key];
            })
        );

    }
    static boundObjsValuesToArray(objsArr) {
        return objsArr.map((obj) => Object.values(obj));
    }

    static mapColumnsToObjValues(obj, keys, columns) {
        return keys.map((key, index) => {
            if (!(typeof obj[key] == 'string')) return `${columns[index]} = ${obj[key]}`;
            else return `${columns[index]} = '${obj[key]}'`;
        });
    }

    static bulkInsert = async(table, objsArr, keys, columns) => {
        let queryInsert = `INSERT INTO ${table}  (${columns.join(',')}) VALUES ?`;
        let values = null;

        if (!keys)
            values = MySql.boundObjsValuesToArray(objsArr);
        else
            values = MySql.processDataObjsToArray(objsArr, keys);

        let [result] = await MySql.pool.query(queryInsert, [values]);
   
    return this.prettyResultForMultiChanges(objsArr,result);
    }
    static prettyResultForMultiChanges(objsArr,result){
        const prettyResult = {
            'insertedIdFrom' : result.insertId,
            'successfullyToAdd': result.affectedRows
        }
    
        if(objsArr.length < result.affectedRows){
            result['error']  =  `MISSED INSERTED/UPDATED DATA : noMissed : ${result[1] - objsArr.length}`;
            result['missed'] = result[1] - objsArr.length;
        }
        return prettyResult;
    }
    static prettyResultForSingeChange(primaryKey,result){
        const prettyResultSingle = {
            'InsertId': result.insertId,
            'isFailed': !(result.affectedRows)
        }
    
        if(prettyResultSingle['isFailed']){
            prettyResultSingle['error']  =  `FAILED TO INSERTED/UPDATED DATA : Missed For main reference ( ${primaryKey} ) }`;
            prettyResultSingle['id'] = primaryKey;
        }
        return prettyResultSingle;
    }
    static update = async(table, obj, keys, columns, conditions , primaryKey) => {
        let queryUpdate = `UPDATE ${table} SET ${MySql.mapColumnsToObjValues(obj,keys,columns)} WHERE ${conditions}`;
        const [result] = await MySql.pool.query(queryUpdate);
        return this.prettyResultForSingeChange(primaryKey,result);
    }

    static deleteByArr = async(table, condition, columnForArr, array) => {
        let queryDelete = `DELETE FROM ${table} WHERE ${condition} AND ${columnForArr} IN (${array.join(',')})`;
        const [result] = await MySql.pool.query(queryDelete); // let [a] = [1,2,3]
        if(!result.affectedRows || result.affectedRows < array.length)
        return {"error" : ` there is some data or whole doesn't exist for what you are trying to delete majesty`,
        "missed" : array.length - result.affectedRows,
        "noDeleted" : result.affectedRows
    };

        return {"noDeleted": result.affectedRows};
    }
/**
 *                 -> promise <- single thread Async
 *                     ->
 * -> x -> y -> z -> u -> p
 *                     ->  
 *                 let p = new Promise( (resolve,reject) => {
 * 
 *                        }   )       
 * 
 */

    static deleteJustOne = async(table,conditionName,conditionValue,primaryColumnName,primaryValue ) => {
        let queryDelete = `DELETE FROM ${table} WHERE ${primaryColumnName} = ? AND ${conditionName} = ?`;
        const [result] = await MySql.pool.query(queryDelete,[primaryValue,conditionValue]);
        if(!result.affectedRows)
        return {"error" : `doesn't exist data for &(${primaryValue} FORM -> MAIN Thing (id) <- , ${conditionValue} FROM -> relational Thing like user id <-)`};
        return {"noDeleted": result.affectedRows};
    }

    static async updateColumnValue(table, primaryColumnName, primaryValue, conditionalKey, conditionalVal, columnName, value) {
        let changeState = `UPDATE ${table} SET ${columnName} = ?  WHERE ${primaryColumnName}= ? AND ${conditionalKey} = ?`
        const [result] = await MySql.pool.query(changeState, [value, primaryValue, conditionalVal]);
        return this.prettyResultForSingeChange(primaryValue,result);
    }
    static validForeignKey(tablePrimaryKey, primaryColumnName, primaryKey, foreignKeyColumnName, foreignKey) {
        return new Promise(async(resolve, reject) => {
            const query = `SELECT ${primaryColumnName} FROM ${tablePrimaryKey} WHERE ${foreignKeyColumnName}= ? AND ${primaryColumnName}= ?`;
            const [result] = await MySql.pool.query(query, [foreignKey, primaryKey]);
       
            if (result[0]) {
             
                return resolve(true);

            } else {
              
                return reject(false);
            }
        });

    }
    static checkState(table, primaryColumnName, primaryKey, stateColumnName, state) {
        return new Promise(async(resolve, reject) => {
            const query = `SELECT ${stateColumnName} FROM ${table} WHERE ${primaryColumnName} = ? AND ${stateColumnName} = ?`;
            const [result] = await MySql.pool.query(query, [primaryKey, state]);

            if (result[0]) {
               return resolve(true);
            } else {
                return reject(false);
            }
        });
    }

    /**
     * async 
     * await 
     *   
     * 
     *   p.then(
     *     (bool)=>{
     *        } )
     *   
     *  p.catch((error) = >)
     *          
     *            
     * 
     */

    



}
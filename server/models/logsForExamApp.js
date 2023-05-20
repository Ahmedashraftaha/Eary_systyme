const arrayExpanded = require('../util/Helper-methods/expand-array');
const jsonPowerful = require('../util/Helper-methods/powerful-json');
const actionStates = require('./enums/examActionState');
const mapExpanded = require('../util/Helper-methods/expand-map');
//  -> logs -> 
//// creation process :
// InCreation || post || pending || accepted || published ->admin //state
// taken process:
// started || pending||  || interactive|| inProgress|| complete -> user //requestStates
module.exports = class TraceExam {
    static determineNamesAttributeInActionsData1(action) {
        switch (action) {
            case actionStates.STARTED:
                return ['whenStarted', 'wasteTimeWithoutAnswerAny'];
            case actionStates.PENDING_LEFT:
                return ['whenLeft', 'actionDoneBy'];
            case actionStates.COMPLETED:
                return ['whenRecorded', 'score', 'timeTakesToCompute'];
            case actionStates.INTERACTIVE:
                return ['whenChosen', 'qId', 'chosenIndex', 'timeTakesToChosenInMins'];
            case actionStates.IN_PROGRESS:
                return ['whenSubmitted', 'totalTimeTakes', 'noAnswers', 'type']
            default:
                return [];
        }
    }
    constructor() {

        this._activities = new Map();

    }

    appendIdentityActivities(id, identityType, actionTypes = [], actionsInfo = [], timeStampRecord = []) {
        for (const i in actionTypes) {
            this.appendNewActivity(id, identityType, actionTypes[i], actionsInfo[i], timeStampRecord[i]);
        }
    }
    appendNewActivity(idForGuilty, identityType, action, actionsInfo, timesStamp = new Date()) {
        // id : [identity,actions,order]
        // if (!actionStates.hasOwnProperty(action))
        //   return false;
        // data : [identity,Map for action]
        appendNewAttrsValToObj(actionsInfo, 'timeStampRecord', timesStamp);
        let dataArray = this._activities.get(idForGuilty) || [];
        if (!dataArray.length) {
            this.createNewIdentityTracer(dataArray, idForGuilty, identityType, action, actionsInfo);
        } else {

            let mapForActions = dataArray[1];
            let actionInfoMap = mapForActions.get(action);
            if (actionInfoMap) {
                this.appendDataToExistIdentityAndAction(actionInfoMap, actionsInfo);
            } else {
                this.appendDataToExistIdentityAndCreateNewAction(mapForActions, action, actionsInfo);
            }
            dataArray[2].push(action);
        }
        return true;
    }
    appendDataToExistIdentityAndAction(mapForActionInfo, actionsInfo) {
        mapExpanded.appendObj(mapForActionInfo, actionsInfo);
    }
    createNewActionInfoMap(mapForActions, action, actionInfo) {
        let mapForActionInfo = new Map();
        appendObj(mapForActionInfo, actionInfo);
        mapForActions.set(action, mapForActionInfo);
    }
    appendDataToExistIdentityAndCreateNewAction(mapForActions, action, actionInfo) {
        this.createNewActionInfoMa(mapForActions, action, actionInfo);
    }
    createNewIdentityTracer(matrix, idForGuilty, identityType, action, actionInfo) {
        let mapForActions = new Map();
        this.createNewActionInfoMap(mapForActions, action, actionInfo);
        matrix.push(identityType, mapForActions);
        let order = [action];
        matrix.push(order);
        this._activities.set(idForGuilty, matrix);
    }

    clearTracer() {
        this._activities.clear();
    }


    deleteFullActions(id) {
        if (!this._activities.has(id)) return false;
        this._activities.delete(id);
        return true;
    }
    deleteSpecificActionState(id, actionStates = []) {
        matrixData = this._activities.get(id);
        if (!matrixData) return false;

        actionStates = arrayExpanded.boundToArray(actionStates);
        for (const action of actionStates) {
            let mapActions = matrixData[1].get(action);
            if (!mapActions)
                continue;
            mapActions.delete(action);
        }
        this.deleteFullActionFromOrder(actionStates, matrixData[2])
        return true;
    }
    deleteFullActionFromOrder(actions = [], referenceOrder, id) {
        let order = referenceOrder || this._activities.get(id)[2];
        if (!order) return false;
        actions = arrayExpanded.boundToArray(actions);
        let deleteObj = {};
        actions.forEach(val => deleteObj[val] = true);
        order = order.filter(act => !deleteObj[act]);
        return true;
    }
    deleteSpecificActionInfo(id, actionState, actionInfo, index) {
        if (!this._activities.has(id)) return false;
        let mapAction = this._activities.get(id)[1].get(actionState);
        if (!mapAction)
            return false;
        let arrInfo = mapAction.get(actionInfo);
        if (index)
            arrInfo.splice(index, 1);
        else
            arrInfo = [];
        return true;
    }




    // map
    whoMadeMoreActivities() {
        return this._activities;
    }
    getIdentityActions(id, actions = []) {
        let matrix = this._activities.get(id);
        if (!matrix)
            return false;
        actions = arrayExpanded.boundToArray(actions);
        let data = [];
        for (const action of actions) {
            data.push(matrix[1].get(action));
        }
        return data;

    }
    getIdentityType(id, matrix) {
        if (id)
            return this._activities.get(id)[0];
        return matrix[0];
    }
    getLastActionInfo(id, cMatrix) {
        let matrix = cMatrix;
        if (id)
            matrix = this._activities.get(id);
        let lastActionState = arrayExpanded.getLastElements(matrix[2], -1);
        return arrayExpanded.getLastElements(matrix[1].get(lastActionState), -1);
    }
    getLastActionType(id, cMatrix) {
        let matrix = cMatrix;
        if (id)
            matrix = this._activities.get(id);
        return arrayExpanded.getLastElements(matrix[2], -1);
    }
    getLastFullAction(id, cMatrix) {
        let matrix = cMatrix;
        if (id)
            matrix = this._activities.get(id);
        //type and info and date
        arrayExpanded.getLastElements(matrix[1])
    }
    getLastActionDate(id) {

    }

    static validActions(actions) {
        if (!actions.length)
            return false;
        for (const action of actions) {
            if (!actionStates.hasOwnProperty(action))
                return false;
        }
        return true;
    }
    getIdentityActions(id, actions = []) {
        if (!this._ids.length || !TraceExam.validActions(actions))
            return [];
        let cActions = arrayExpanded.boundToArray(actions);

        let activitiesDataIdentity = this.getDataForJustIdentity(id);
        let allAction = [];
        for (const data of activitiesDataIdentity) {
            if (cActions.includes(data[2])) {
                allAction.push(data);
            }
        }
        return allAction;
    }

    static destructDataFromWholeData(wholeData, index) {
            if (!wholeData.length)
                return [];
            let dataDis = [];
            for (const data of wholeData) {
                dataDis.push(data[index]);
            }
            return dataDis;
        }
        // index       
        //this._ids = ids || [];
        //this._identities = identitiesTypes || [];
        //this._actions = actions || [];
        //this._actionsInfo = actionsInfo || [];
        //this._timeForActions = timeForActions || [];
    static destructsTimesFromWholeData(wholeData) {
        wholeData = arrayExpanded.boundToArray(wholeData);
        return TraceExam.destructDataFromWholeData(wholeData, 4);

    }
    static destructActionsFromWholeData(wholeData) {
        wholeData = arrayExpanded.boundToArray(wholeData);
        return TraceExam.destructDataFromWholeData(wholeData, 2);


    }
    static destructDataOfActionsFromWholeData(wholeData) {
        wholeData = arrayExpanded.boundToArray(wholeData);

        return TraceExam.destructDataFromWholeData(wholeData, 3);


    }
    static destructIdentityFromWholeData(wholeData) {
        wholeData = arrayExpanded.boundToArray(wholeData);

        return TraceExam.destructDataFromWholeData(wholeData, 1);


    }
    static destructIdsFromWholeData(wholeData) {
        wholeData = arrayExpanded.boundToArray(wholeData);

        return TraceExam.destructDataFromWholeData(wholeData, 0);
    }

    getThatIdentityDoActionsBoundedToObj(id, actions) {
            if (!this._ids.length || !TraceExam.validActions(actions))
                return {};
            let data = this.getIdentityActions(id, actions);
            let found = true;
            if (!data.length)
                found = false;

            return {
                id: id,
                hasFound: found,
                wholeData: data
            };
        }
        // exam App obj must have getTimeAllowedForTakeRest
        // exam must have duration  
        //        //enum
        /*
        started: started, / / - > when
        pendingAndLeft: pendingAndLeft, // restOfTime, 
        interactive: interactive, // when 
        inProgress: inProgress, // when submit  
        completed: completed//score
        // when submit (inTime because server takes time to compute)
        // when submit answer to just one question
        */



    identityInteractive(id, from = 0, to = 0, actionsHappen = [], activitiesForApplyActionHappen = []) {
        let { cId, hasFound, wholeData } = this.getThatIdentityDoActionsBoundedToObj(id, [actionStates.INTERACTIVE]);
        if (!hasFound)
            return [];
        let dataOfActions = TraceExam.destructDataOfActionsFromWholeData(wholeData);

    }
    identityTakenFullTimesToFinish(id) {
        let { cId, hasFound, wholeData } = this.getThatIdentityDoActionsBoundedToObj(id, [actionStates.STARTED, actionStates.IN_PROGRESS]);
        if (!hasFound)
            return [];
        let dataActionsOfBoth = TraceExam.destructDataOfActionsFromWholeData(wholeData);
        let examFinishTimes = [
            [],
            []
        ];
        let start = end = 0;
        for (let i = 0; i < dataActionsOfBoth.length - 2; i++) {
            if (dataActionsOfBoth[i].hasOwnProperty('whenStarted') && !start) {
                start = dataActionsOfBoth[i]['whenStarted'];
            } else if (dataActionsOfBoth[i].hasOwnProperty('whenSubmitted') && !end) {
                end = dataActionsOfBoth[i]['whenSubmitted'];
            }
            if (start && end) {
                examFinishTimes[0].push(start);
                examFinishTimes[1].push(end);
                start = end = 0;
            }
        }
        if (dataActionsOfBoth[dataActionsOfBoth.length - 1].hasOwnProperty('whenStarted'))
            examFinishTimes[0].push(dataActionsOfBoth[i]['whenStarted']);
        if (dataActionsOfBoth[dataActionsOfBoth.length - 2].hasOwnProperty('whenSubmitted'))
            examFinishTimes[1].push(dataActionsOfBoth[i]['whenSubmitted']);
        return examFinishTimes;
    }

    static destructDataActionInteractiveBoundToArray(interactiveActivity = {}) {
        let qId, chosenIndex, timeTakesToChosenMins, whenChosen;
        if (interactiveActivity.hasOwnProperty('qId'))
            qId = interactiveActivity['qid'];
        if (interactiveActivity.hasOwnProperty('chosenIndex'))
            chosenIndex = interactiveActivity['chosenIndex'];
        if (interactiveActivity.hasOwnProperty('timeTakesToChosenMins'))
            timeTakesToChosen = interactiveActivity['timeTakesToChosenMins'];
        if (interactiveActivity.hasOwnProperty('whenChosen'))
            whenChosen = interactiveActivity['whenChosen'];

        return [qId, chosenIndex, timeTakesToChosenMins, whenChosen];
    }

    destructActivitiesToInstances(fullActivities = []) {
        let instances = [];
        for (let i = 0; i < fullActivities.length; i++) {
            let instance = [];
            if (fullActivities[i][2] === actionStates.STARTED) {
                instance.push(fullActivities[i++]);
                while (fullActivities[i][2] !== actionStates.COMPLETED && i < fullActivities.length) {
                    instance.push(fullActivities[i])
                    i++;
                }
                if (i < fullActivities.length)
                    instance.push(fullActivities[i]);

            }
            instances.push(instance);
        }
        return instances;
    }
    analyzeIdentityActivities(id) {
        let fullActivities = this.getDataForJustIdentity(id);
        if (!fullActivities.length)
            return [];
        let instances = this.destructActivitiesToInstances(fullActivities);

    }
    static determineNamesAttributeInActionsData(action) {
        switch (action) {
            case actionStates.STARTED:
                return ['whenStarted', 'wasteTimeWithoutAnswerAny'];
            case actionStates.PENDING_LEFT:
                return ['whenLeft', 'actionDoneBy'];
            case actionStates.COMPLETED:
                return ['whenRecorded', 'score', 'timeTakesToCompute'];
            case actionStates.INTERACTIVE:
                return ['whenChosen', 'qId', 'chosenIndex', 'timeTakesToChosenInMins'];
            case actionStates.IN_PROGRESS:
                return ['whenSubmitted', 'totalTimeTakes', 'noAnswers', 'type']
            default:
                return [];
        }
    }

    // map
    whereRepeatedActionsFromWholeData(fullData) {
        return arrayExpanded.repeatedValues(TraceExam.destructActionsFromWholeData(fullData));
    }
    getInteractiveActivitiesForInstance(instance, indices) {
        let indicesInInstance = indices || this.whereRepeatedActionsFromWholeData(instance).get(actionStates.INTERACTIVE);
        let fullInteractiveData = arrayExpanded.mapIndexesToValues(instance, indicesInInstance);
        let dataActionsInteractive = TraceExam.destructDataOfActionsFromWholeData(fullInteractiveData);
        return dataActionsInteractive;
    }
    getTakesTimeToFinishFromAToZForInstance(instance, indices) {
        let dataActionsInteractive = this.getInteractiveActivitiesForInstance(instance, indices);
        let totalTime = 0;
        for (const data of dataActionsInteractive) {
            totalTime += data['timeTakesToChosenInMins'];
        }
        return totalTime;
    }
    getInprogressActivityForInstance(instance) {
        //['whenSubmitted', 'totalTimeTakes', 'noAnswers', 'type']
        let inProgress = TraceExam.destructActionsFromWholeData(instance[length - 2]);
        if (inProgress !== actionStates.inProgress)
            return [];
        let fullInProgressData = arrayExpanded.mapIndexesToValues(instance, ([index] || [length - 2]));
        let dataActionInProgress = TraceExam.destructDataOfActionsFromWholeData(fullInProgressData);
        return dataActionInProgress;
    }
    getCompletedActivityForInstance(instance) {
        let completed = TraceExam.destructActionsFromWholeData(instance[length - 1]);
        if (completed !== actionStates.COMPLETED)
            return [];
        let fullCompletedData = arrayExpanded.mapIndexesToValues(instance, ([index] || [length - 1]));
        let dataActionCompleted = TraceExam.destructDataOfActionsFromWholeData(fullCompletedData);
        return dataActionCompleted;
    }
    getFullTimeTakesForInstance(instance, index) {
        let dataActionInProgress = this.getInprogressActivityForInstance(instance, index);
        return dataActionInProgress['totalTimeTakes'];
    }

    // [[started],[left]]
    getTimeForInstance(instance, indicesFoStartedAndPendingAndInteractive) {
        let indicesTogether = indicesFoStartedAndPendingAndInteractive || arrayExpanded.getMultipleFromMap(this.whereRepeatedActionsFromWholeData(instance), [actionStates.STARTED, actionStates.PENDING_LEFT]);
        //['whenLeft', 'actionDoneBy'];
        let fullDataStartedAndLeft = arrayExpanded.mapIndexesToValues(instance, arrayExpanded.translateArraysToArray(indicesTogether));
        let actionDataStartedAndLeft = TraceExam.destructDataOfActionsFromWholeData(fullDataStartedAndLeft);

        let consumeTime = this.getTakesTimeToFinishFromAToZForInstance(instance);
        let timeWasted = 0;

        for (const dataObj of actionDataStartedAndLeft)
            if (dataObj['whenStarted']) {

            } else if (dataObj['whenLeft']) {

        }


    }

    getTimeBetweenTwoActionsForInstance(instance, action, anotherAction) {

    }
    getTimeBetweenTwoActionsForTwoInstance(instances, action,
        anotherInstance, indexForInstance, indexForAnotherInstance) {

    }
    identityTakenTimesToFinish(id, from = 0, to = 0, actionsHappen = [], activitiesForApplyActionHappen = []) {
        actionsHappen = arrayExpanded.boundToArray(actionStates);
        let { cId, hasFound, wholeData } = this.getThatIdentityDoActionsBoundedToObj(id, [actionStates.INTERACTIVE]); // supposedly add all actions
        if (!hasFound)
            return [];
        let actions = activitiesForApplyActionHappen.concat(TraceExam.destructActionsFromWholeData(wholeData));
        let dataActions = TraceExam.destructDataOfActionsFromWholeData(wholeData);

        if (!to)
            to = dataActions.length - 1;
        let interactiveActivities = [];
        totalTimeInMins = 0,
            endedAtIndex = to;
        for (let i = from; i <= to; i++) {
            if (actionsHappen.length > 0)
                if (actions.includes(actionsHappen)) {
                    endedAtIndex = i;
                    break;
                }
            interactiveActivities.push(TraceExam.destructDataActionInteractiveBoundToArray(dataActions[i]));


        }
        totalTimeInMins = arrayExpanded.sumAllInRow(interactiveActivities, 2);
        return [totalTimeInMins, endedAtIndex, interactiveActivities];
    }

    identityWastedTimesInMins(id) {
        let { cId, hasFound, wholeData } = this.getThatIdentityDoActionsBoundedToObj(id, [actionStates.STARTED, actionStates.PENDING_LEFT]);
        if (!hasFound)
            return [];
        let dataActionsOfBoth = TraceExam.destructDataOfActionsFromWholeData(wholeData);
        let actions = TraceExam.destructActionsFromWholeData(wholeData);
        let totalWastedTimeInMins = 0;
        // whenStarted whenLeft
        let start = left = timeConsuming = 0;
        for (let i = 0; i < dataActionsOfBoth.length; i++) {
            if (dataActionsOfBoth[i].hasOwnProperty('whenStarted') && !start) {
                start = dataActionsOfBoth[i]['whenStarted'];

            } else if (dataActionsOfBoth[i].hasOwnProperty('whenLeft') && !left) {
                left = dataActionsOfBoth[i]['whenLeft'];
            } else {
                let consume = 0;
                [consume, i] = this.identityTakenTimesToFinish(id, i, 0, actionStates.PENDING_LEFT, actions);
                timeConsuming += consume;
            }
            if (left) {
                totalWastedTimeInMins += Math.abs(left - timeConsuming - start);
                start = left = timeConsuming = 0;
            }
        }
        return totalWastedTimeInMins;

    }


    getActivityBoundedToObj(index) {

        return {
            id: this._ids[index],
            identityType: this._identities[index],
            action: this._actions[index],
            actionsInfo: this._actionsInfo[index],
            timeForAction: this._timeForActions[index]
        };
    }
    activityBoundedToArray(index) {
        return [
            this._ids[index],
            this._identities[index],
            this._actions[index],
            this._actionsInfo[index],
            this._timeForActions[index]
        ];
    }
    identitiesWithSpecificActions(actions) {
        if (!this._ids.length || !TraceExam.validActions(actions))
            return [];

        const identities = [];

        let indices = arrayExpanded.whereValueRepeated(this._actions, actions);
        for (const index of indices)
            identities.push(this.getActivityBoundedToObj(index));

        return identities;
    }
    identitiesMadeStartedAction() {
        return this.getIdentitiesWithSpecificActions(actionStates.STARTED);
    }
    identitiesMadePendingAction() {
        return this.getIdentitiesWithSpecificActions(actionStates.PENDING_LEFT);
    }
    identitiesMadeSubmittedAction() {
        return this.getIdentitiesWithSpecificActions(actionStates.IN_PROGRESS);
    }
    getIdentitiesMadeFinishAction() {
        return this.getIdentitiesWithSpecificActions(actionStates.COMPLETED);
    }
    getIdentitiesMadeInteractiveAction() {
        return this.getIdentitiesWithSpecificActions(actionStates.INTERACTIVE);
    }

    getActivitiesBetween(startTime, endTime) {
        if (!this._ids.length)
            return [];
        let idsForWhoDid = [];
        this._timeForActions.forEach((value, index) => {
            if (value >= startTime && value <= endTime) {
                idsForWhoDid.push(index);
            }
        });
        return idsForWhoDid;
    }
    getAllData() {
        if (!this._ids.length)
            return {};
        return {
            table: arrayExpanded.margeRelativeInRow(
                this._ids,
                this._identities,
                this._actions,
                this._actionsInfo,
                this._timeForActions),
            ids: jsonPowerful.convertMapToObject(this.whoMadeMoreActivities())
        };
    }
    static reDefine(objTraceExam, ids, identitiesTypes, actions, actionsInfo, timeForActions) {
        if (!objTraceExam instanceof TraceExam)
            return false;

        objTraceExam._ids = ids || [];
        objTraceExam._identities = identitiesTypes || [];
        objTraceExam._actions = actions || [];
        objTraceExam._actionsInfo = actionsInfo || [];
        objTraceExam._timeForActions = timeForActions || [];
        return true;

    }


}
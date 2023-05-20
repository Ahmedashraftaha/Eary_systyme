module.exports = Object.freeze({
    STARTED: Symbol('started'), // -> when req
    PENDING_LEFT: Symbol('pendingAndLeft'), // restOfTime, 
    INTERACTIVE: Symbol('interactive'), // when submit answer to just one question
    IN_PROGRESS: Symbol(`inProgress`), // when submit (inTime because server takes time to compute)   
    COMPLETED: Symbol('completed') // score
});
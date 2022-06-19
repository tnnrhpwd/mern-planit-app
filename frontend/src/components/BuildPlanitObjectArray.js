function BuildPlanObjectArray( goals, plans, comments ) {
    var outputPlanObjectArray = [];
    plans.forEach( ( indPlan ) => {                         // for each plan inported from database
        // get array of plan arrays
        const groopPlan = indPlan.plan.map( ( goalIDString, goalIndex ) => {
            const zrupGoal = goals.find( x => x._id === goalIDString )
            if(zrupGoal === undefined){return"";}
            const zrupArray = [
                zrupGoal._id,
                zrupGoal.goal,
                zrupGoal.user,
                zrupGoal.createdAt,
                zrupGoal.updatedAt,
            ]
            return zrupArray
        })
        // get array of plan goal attributes
        const grypGoal =  goals.find( x => x._id === indPlan.goal )
        if(grypGoal === undefined){return;}
        const groopGoal = [
            grypGoal._id,
            grypGoal.goal,
            grypGoal.user,
            grypGoal.createdAt,
            grypGoal.updatedAt,
        ]
        // get array of plan comment arrays

        var groopComment = []
        comments.forEach( ( indComment, indCommentIndex ) => {
            if(indComment.topic === indPlan._id){ 
                groopComment.push([
                    indComment._id,
                    indComment.comment,
                    indComment.user,
                    indComment.createdAt,
                    indComment.updatedAt,
                ]
            )}
        })
        // build output array
        const groops = [
            indPlan._id,
            indPlan.user,
            groopGoal,
            groopPlan,
            groopComment,
            indPlan.agrusers,
            indPlan.disusers,
            indPlan.followers,
            indPlan.createdAt,
            indPlan.updatedAt,
        ]
        outputPlanObjectArray.push(groops)                     // add to object output array
    })

    var goalsForThisSpecificGoal = [];
    var outputGoalObjectArray = [];
    goals.forEach( ( indGoal ) => {
        var plansForThisSpecificGoal = []
        outputPlanObjectArray.forEach( ( specificPlan ) => {
            if( specificPlan[2][0] === indGoal._id ){
                plansForThisSpecificGoal.push(specificPlan)

            }
            specificPlan[3].forEach( ( stepOfGoalPlan ) => {
                if( stepOfGoalPlan[0] === indGoal._id ){
                    goalsForThisSpecificGoal.push(specificPlan)
                    
                }

            })


        })

        outputGoalObjectArray.push([
            indGoal._id,
            indGoal.goal,
            indGoal.user,
            indGoal.createdAt,
            indGoal.updatedAt,
            plansForThisSpecificGoal,
            goalsForThisSpecificGoal,
        ])
    })

    var outputCommentObjectArray = [];
    comments.forEach( ( indComment ) => {
        outputCommentObjectArray.push([
            indComment._id,
            indComment.user,
            indComment.topic,
            indComment.comment,
            indComment.createdAt,
            indComment.updatedAt,

        ])
    })

    const outputArray = [ 
        outputGoalObjectArray,
        outputPlanObjectArray,
        outputCommentObjectArray,
    ]
    console.log(outputArray);
    return ( outputArray )
}

export default BuildPlanObjectArray
function BuildPlanObjectArray( goals, plans, comments ) {
    var outputPlanObjectArray = [];
    plans.forEach( ( indPlan, indPlanIndex ) => {                         // for each plan inported from database
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
            if(indComment.plan === indPlan._id){ 
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
    console.log(outputPlanObjectArray);
    return ( outputPlanObjectArray )
}

export default BuildPlanObjectArray
function BuildObjectArray( goals, plans, comments, actions ) {
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

    var outputGoalObjectArray = [];
    goals.forEach( ( indGoal ) => {
        var goalsForThisSpecificGoal = [];
        var plansForThisSpecificGoal = []
        outputPlanObjectArray.forEach( ( specificPlan ) => {
            if( specificPlan[2][0] === indGoal._id ){ // if indGoal is head goal of plan
                plansForThisSpecificGoal.push(specificPlan)
            }
            specificPlan[3].forEach( ( stepOfGoalPlan ) => {
                if( stepOfGoalPlan[0] === indGoal._id ){  // if indGoal is a step of plan
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

    var outputActionObjectArray = [];
    if(actions){
        actions.forEach( ( indAction ) => {
            const actionData = indAction.data.map( ( insideAction ) => {
                const actionGoal = goals.find( x => x._id === insideAction[0] )
    
                return [
                    [
                        actionGoal._id,
                        actionGoal.goal,
                        actionGoal.user,
                        actionGoal.createdAt,
                        actionGoal.updatedAt,
                    ],
                    insideAction[1],
                    insideAction[2],
                    insideAction[3],
                ]
            })
    
            outputActionObjectArray.push([
                indAction._id,
                indAction.user,
                actionData,
                indAction.createdAt,
                indAction.updatedAt,
            ])
        })
    } 

    

    const outputArray = [ 
        outputGoalObjectArray,
        outputPlanObjectArray,
        outputCommentObjectArray,
        outputActionObjectArray,
    ]
    console.log(outputArray);
    // return ( outputArray )

    if( goals && plans && actions && comments ){
        const planitObjectArray = goals.map( ( eachGoal ) => {
            var plansForThisSpecificGoal = [];
            var goalsForThisSpecificGoal = [];
            var goalComments = [];
            var goalActions = [];

            plansForThisSpecificGoal = plans.map( ( eachPlan ) => {
                return eachPlan
            })
            goalsForThisSpecificGoal = goals.map( ( eachInnerGoal ) => {
                
            })
            comments.forEach( ( eachComment ) => {
                if( eachComment.topic === eachGoal._id ){
                    goalComments.push([
                        eachComment._id,
                        eachComment.user,
                        eachComment.topic,
                        eachComment.comment,
                        eachComment.agrusers,
                        eachComment.disusers,
                        eachComment.createdAt,
                        eachComment.updatedAt,
                    ])
                }
            })
            actions.forEach( ( eachAction ) => {
                if( eachAction.data[0][0] === eachGoal._id ){
                    goalActions.push([
                        eachAction._id,
                        eachAction.user,
                        eachAction.data, // need to assign plans and goals for each interior goal
                        eachAction.createdAt,
                        eachAction.updatedAt,
                    ])
                }
            })
    
            return [
                eachGoal._id,
                eachGoal.goal,
                eachGoal.user,
                eachGoal.createdAt,
                eachGoal.updatedAt,
                plansForThisSpecificGoal,
                goalsForThisSpecificGoal,
                goalComments,
                goalActions,
    
            ]
        })
        console.log(planitObjectArray);
        return planitObjectArray;
    }


}

export default BuildObjectArray
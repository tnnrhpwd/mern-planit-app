import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'      // useDispatch-brings in reset,register,login from state
import { toast } from 'react-toastify'                        // visible error notifications
import { createPlan } from '../../features/plans/planSlice'
import './PlanInput.css';

function PlanInput() {
    const [plan, setPlan] = useState('')
    const [goal, setGoal] = useState('')

    const initialPlanInputArray = [{
        type: "text",
        id: 1,
        value: "",
    }]

    const [ planInputArray, setPlanInputArray ] = useState(initialPlanInputArray)

    const addPlanInput = () => {
        setPlanInputArray(stringArray => {
            const lastId = stringArray[stringArray.length - 1].id;
            return [...stringArray, {
                type: "text",
                value: "",
            }]
        })
    }

    const handlePlanInputChange = (e) => {
        e.preventDefault();
        // get stringarray of inputs
        const currentIndex = e.target.id;
        setPlanInputArray(stringArray => {
            const newPlanInputArray = stringArray.slice();
            newPlanInputArray[currentIndex].value = e.target.value;

            return newPlanInputArray;
        });
    };

    useEffect(() => {
        if(!planInputArray){ return; } // GUARD CLAUSE - no planarray
        //get convert array to string to send to redux
        var outputString = [];
        planInputArray.map((item, itemIndex) => {
            if( itemIndex === 0 ){
                outputString = item.value
            } else { 
                outputString = outputString + "|planit-item|"+item.value
            }

        })
        setPlan(outputString)
    }, [planInputArray])

    const dispatch = useDispatch()  // initialization

    const onSubmit = (e) => {
        if( goal === '' ) { toast.error("Please enter a goal first.", { autoClose: 1000 }); return; }
        if( plan === '' ) { toast.error("Please enter a plan first.", { autoClose: 1000 }); return; }
        e.preventDefault()

        dispatch(createPlan({ plan,goal }))   // dispatch connects to the store, then creates a plan with text input
        setPlan('')                      // empty planstring field
        setPlanInputArray(initialPlanInputArray)            // reset planarray field
        setGoal('')                      // empty goal field
        toast.success("Plan Created!", { autoClose: 1000 });
    }

    return (
        <div className='planit-planinput'>

                <div className='planit-planinput-group'>
                    <textarea
                        type='goal'
                        name='goal'
                        id='planit-planinput-input-goal'
                        placeholder='Enter goal here.'
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}   // change text field value
                    />
                    {planInputArray.map((item, itemIndex) => {
                        return (
                            <textarea
                                name='plan'
                                className='planit-planinput-input-plan'
                                onChange={handlePlanInputChange}
                                value={item.value}
                                placeholder={"Enter task #"+(itemIndex+1)}
                                id={itemIndex}
                                type={item.type}
                                size={50}
                                key={itemIndex}
                            />
                        )
                    })}
                </div>
                <div className='planit-planinput-group'>
                    <button className='planit-planinput-submit' type='addTask' onClick={addPlanInput}>
                        Add Another Task
                    </button>
                    <button onClick={onSubmit} className='planit-planinput-submit' type='submit'>
                        Submit Plan ✔
                    </button>
                </div>

        </div>
    )
}

export default PlanInput
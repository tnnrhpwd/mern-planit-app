import './PlanPreview.css';

function PlanPreview(props) {
    const offsetMultiplier = 1.5;
    const plan = props.planIdentity;
    const yOffset = props.screenY * offsetMultiplier + 50;



    return (
        <div className='planpreview'>
            <div className='planpreview-window'
                style={{marginTop: yOffset}}
                >
                <div className='planpreview-window-goal'>
                    {plan.goal}
                </div>
                <div className='planpreview-window-close'>
                    <button onClick={props.handlePlanPreviewClose}>Close</button>
                </div>
                <div className='planpreview-window-plan'>
                    {plan.plan}
                </div>



            </div>

        </div>
    )
}

export default PlanPreview
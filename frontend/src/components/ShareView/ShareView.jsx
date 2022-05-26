import './ShareView.css'

function ShareView(props) {
    const type = props.type;
    const id = props.id;
    const link = "https://mern-planit-app.herokuapp.com/"+{type}+{id};
    const ref = props.ref;

  return (
    <div className='shareview' ref={ref}>
        This is a shareable link to the {type}.
        <br/>
        <a className='shareview-link' href={link}>{link}</a>
    </div>
  )
}

export default ShareView
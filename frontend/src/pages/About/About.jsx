import './About.css'

const portfolioLink = "https://sthopwood.com/"

function About() {

  return (
    <div className='about'>
      <div className='about-title'>
        About Planit
      </div>
      <>
        <div className='about-description'>
          The goal of this website is to help users build and decide upon plans to achieve their goals. 
          <br/>
          <br/> Create a goal or direction. 
          <br/> Decide upon a plan to meet your measurable success criteria. 
          <br/> Follow your plan, learning more for future plans.


          <div className='about-portfolio'>
          To see more of my projects, <br/>
            <a className='about-portfolio-link' href={portfolioLink} rel="noreferrer" target="_blank" >visit my portfolio at www.STHopwood.com</a>
          </div>

          {/* Turn goals(direction) into objectives(path w/ measurable criteria) */}


          {/* OODA ( Observe, Orient, Decide, Act ) is a famous operations process used to effectively take strategic actions, 
          and all humans may utilize this cycle without realizing it. Although humans are evolutionarily excellent at observing, orienting, and acting,
          it is more beneficial to */}

        </div>
        <div className='about-div-right'>
          
        </div>
      </>
    </div>
  )
}

export default About
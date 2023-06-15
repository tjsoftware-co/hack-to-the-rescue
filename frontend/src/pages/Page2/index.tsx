import parse from "html-react-parser"
import { useState } from "react"
import { CSSTransition } from "react-transition-group"

import { steps } from "./consts"
import "./styles.scss"

const Page2 = () => {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <div className="page2">
      <div className="bg-core bg-core--taller">
        <img className="bg-core__bg" src="src/assets/bg.svg" alt="" />
        <img className="bg-core__placek" src="src/assets/placek.svg" alt="" />
        <img className="bg-core__dots" src="src/assets/dots.svg" alt="" />
      </div>

      <section className="page2__info-section">
        <div className="info-section__tile">
          <CSSTransition key={activeStep} timeout={100}>
            <>
              <h1 className="tile__title">
                {parse(steps[activeStep - 1].title)}
              </h1>
              <img
                className="tile__iconography"
                src={`src/assets/iconography-${activeStep}.svg`}
                alt=""
              />
            </>
          </CSSTransition>

          <div className="info-section__steps">
            {[...Array(4)].map((_element, index) => {
              const currentStep = index + 1

              return (
                <div
                  key={index}
                  className={`info-section__step ${
                    activeStep === currentStep && "info-section__step--active"
                  }`}
                  onClick={() => setActiveStep(currentStep)}>
                  {activeStep === currentStep
                    ? `Step ${currentStep}`
                    : currentStep}
                </div>
              )
            })}
          </div>
        </div>

        <div className="info-section__tile">
          <CSSTransition key={activeStep} timeout={100}>
            <>
              <img
                className="tile__header-image"
                src={`src/assets/header-image-${
                  activeStep <= 2 ? "1" : "2"
                }.svg`}
                alt=""
              />
              <ul className="tile__instructions">
                {steps[activeStep - 1].instructions.map(
                  (instruction, index) => (
                    <li key={index} className="tile__instruction">
                      {instruction}
                    </li>
                  )
                )}
              </ul>
              <img
                className="tile__ilustration"
                src={`src/assets/ilustration-${activeStep}.png`}
                alt=""
              />
            </>
          </CSSTransition>
        </div>
      </section>
    </div>
  )
}

export default Page2

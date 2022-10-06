import styles from './register.module.css';
import React, { useState } from "react";
import { Button, Steps } from "antd";

const RegisterStepPanel = (props) => {
    const [activeStep, setActiveStep] = useState(0);

    function next() {
        const nextStep = activeStep + 1;
        setActiveStep(nextStep);
    }

    function prev() {
        const prevStep = activeStep - 1;
        setActiveStep(prevStep);
    }

    return (
        <>
            <Steps progressDot current={activeStep} style={{ width: 400 }}>
                {props.steps.map((item) => (
                    <Steps.Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{props.steps[activeStep].content}</div>
            <div className="steps-action">
                {activeStep > 0 && (
                    <Button className={`${styles.btnChild}`} type="primary" size="large" onClick={() => prev()}>
                        Quay lại
                    </Button>
                )}
                {activeStep < props.steps.length - 1 && (
                    <Button className={`${styles.btnChild}`} type="primary" size="large" onClick={() => next()}>
                        Tiếp
                    </Button>
                )}
                {activeStep === props.steps.length - 1 && (
                    <Button className={`${styles.btnChild}`} type="primary" htmlType="submit" size="large">
                        Đăng ký
                    </Button>
                )}
            </div>
        </>
    )
}

export { RegisterStepPanel };

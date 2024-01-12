import React, { useState } from "react";
import { Button, message, Steps } from 'antd';
import UploadCSV from "./uploadCSV";


const steps = [
  {
    title: 'First',
    content: <UploadCSV />,
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

const FormSteps: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map(item => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps current={current} items={items} />
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next 
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default FormSteps;

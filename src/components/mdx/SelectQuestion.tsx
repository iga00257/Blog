import { Button, ButtonGroup, Description } from '@geist-ui/core';

interface Props {
  questionName: string;
  question: string;
  options: string[];
}

function SelectQuestion(props: Props) {
  return (
    <div className='mdx-component my-12 w-full rounded-lg bg-zinc-50 p-2 dark:bg-dark-bg-secondary'>
      <Description
        style={{ margin: '16px 8px' }}
        title={props.questionName}
        content={props.question}
      />
      <ButtonGroup vertical width='100%'>
        {props.options.map((opt, i) => (
          <Button key={i} style={{ textAlign: 'left' }} {...({} as any)}>
            {opt}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default SelectQuestion;

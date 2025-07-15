import { Button } from '@/components/ui/button';

interface Props {
  questionName: string;
  question: string;
  options: string[];
}

function SelectQuestion(props: Props) {
  return (
    <div className='mdx-component my-12 w-full rounded-lg bg-muted p-4'>
      <div className='mb-4'>
        <h3 className='text-lg font-semibold'>{props.questionName}</h3>
        <p className='text-sm text-muted-foreground'>{props.question}</p>
      </div>
      <div className='flex flex-col gap-2'>
        {props.options.map((opt, i) => (
          <Button key={i} variant='outline' className='justify-start text-left'>
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default SelectQuestion;

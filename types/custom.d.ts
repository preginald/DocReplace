type Doc = {
  title: string;
  slug: string;
  author: string;
  inputs: Input[];
  steps: Step[];
  valid: boolean;
  status: string;
};

type Input = {
  label: string;
  name: string;
  value: string;
};

type Step = {
  id: string;
  order: number;
  title: string;
  tasks: Task[];
};

type Language = {
  id: string;
  name: string;
  prompt: string;
};

type Task = {
  id: string;
  order: number;
  language: Language;
  intro: string;
  input: string;
  output: string;
  focus: boolean | null;
};

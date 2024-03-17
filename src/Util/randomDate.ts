type PropsRandomDate = {
  start: Date;
  end: Date;
};

const randomDate = ({ start, end }: PropsRandomDate): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export default randomDate;

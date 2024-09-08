import BoardTables from "./components/BoardTables";
interface Props {
  params: { boardId: string };
}

const BoardPage = ({ params: { boardId } }: Props) => {
  return <BoardTables boardId={boardId} />;
};

export default BoardPage;

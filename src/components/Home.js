import Homepage from "./Homepage";

export default function Home(props) {
  const { setProgress } = props;

  return (
    <div>
      <Homepage setProgress={setProgress} />
    </div>
  );
}

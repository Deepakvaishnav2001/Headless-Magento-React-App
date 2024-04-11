
function IntroToJsx() {
    const v1 = 'test';
  return (
    <div className="App" style={{color:"green"}}>
      <h1>{v1}</h1>
    </div>
  );
}

export default IntroToJsx;

export function IntroToJsx1() {
    const v1 = 'test';
  return (
    <div className="App">
      <h1>{v1}</h1>
    </div>
  );
}
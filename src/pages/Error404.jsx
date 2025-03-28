import "../404assets/style.css";

const Error404 = () => {
  return (
    <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>Upgrade!</h1>
			</div>
			<h2>Mapchain is currently in upgrading progress</h2>
			<p>Please come back later.</p>
			<a href="/">Go to Landing page</a>
		</div>
	</div>
  );
};

export default Error404;

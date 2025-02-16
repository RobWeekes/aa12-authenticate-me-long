import SpotTile from '../SpotTile';

const LandingPage = ({ spots }) => {
  return (
    <div>
      <h1>All Spots</h1>
      <div className="spot-tiles">
        {spots.map((spot) => (
          <SpotTile key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;

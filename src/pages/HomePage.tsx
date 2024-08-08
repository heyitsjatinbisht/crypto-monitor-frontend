import PriceList from "../components/PriceList";
import AlertForm from "../components/AlertForm";

const HomePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font-bold mb-4">
        Welcome to Crypto Monitoring
      </h1>
      <div className="mb-8 ">
        <PriceList />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-center mb-4">Set Alerts</h2>
        <AlertForm />
      </div>
    </div>
  );
};

export default HomePage;

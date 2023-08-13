const WorkoutDetails = (props) => {
  const { title, load, reps, createdAt } = props;

  return (
    <div className="py-6 px-4 bg-green-50 opacity-70 shadow-xl ">
      <h4 className="text-2xl font-semibold mb-3 text-green-500">{title}</h4>
      <p className="text-xl">
        <span className=" font-medium">Load (kg):</span>
        {load}
      </p>
      <p className="text-xl mb-3">
        <span className=" font-medium ">Reps:</span>
        {reps}
      </p>
      <p>{createdAt}</p>
    </div>
  );
};
export default WorkoutDetails;

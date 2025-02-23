const FeedCard = ({feed}) => {
    const { firstName, lastName, age, gender } = feed;

    return(   <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName} {lastName}</h2>
          <p>Age: {age}</p><p>Gender: {gender}</p>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="card-actions justify-center my-2">
          <button className="btn btn-secondary">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>)
}

export default FeedCard;
const UserCard = ({user}) => {
    const { firstName, lastName, age, gender, about, photoUrl } = user;

    return(   <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={photoUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName} {lastName}</h2>
          <div>Age: {age}</div>
          <div>Gender: {gender}</div>
          <p>{about}</p>
          <div className="card-actions justify-center my-2">
          <button className="btn btn-secondary">Ignore</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>)
}

export default UserCard;
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex align-items-center">
            <h3 className="mr-3 mb-0">New Workout</h3>
            <div>
              <button className="btn btn-primary d-flex align-items-center"><FaPlus /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
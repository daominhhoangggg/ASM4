import React from 'react';

export const Loading = () => {
  return (
    <div className="col-12 d-flex justify-content-center align-items-center loading">
      <div>
        <span className="fa fa-spinner fa-spin fa-3x fa-fw text-primary"></span>
        <p>Đang tải . . .</p>
      </div>
    </div>
  );
};

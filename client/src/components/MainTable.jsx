import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doDeleteData } from '../redux/reducers/DeleteDataReducer';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Swal from 'sweetalert2';
import Preloader from './Preloader';

function MainTable({userData}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(userData?.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = userData?.slice(indexOfFirstRow, indexOfLastRow);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleDelete = (id) => {
    dispatch(doDeleteData(+id))
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: 'Deleted successfully!',
      showConfirmButton: false,
      timer: 1000
    })
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          id={i}
          onClick={handleClick}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </Pagination.Item>
      );
    }

    const paginationBasic = (
      <div>
        <Pagination>{pageNumbers}</Pagination>
      </div>
    );
    return paginationBasic;
  };


  if(!userData) {
    return <Preloader />
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className='text-center align-middle'>
            <th className='text-center'>#</th>
            <th style={{verticalAlign: 'middle'}}>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {currentRows?.map((el, i) => {
            return (
              <tr key={i} className='text-center align-middle'>
                <td>{(currentPage - 1)*10 + (i+1)}</td>
                <td>{el.firstName}</td>

                <td>{el.lastName && el.lastName.split('').map((mapEl, i) => {
                  if (i === 0 || i === el.lastName.length - 1) {
                    return mapEl
                  } else {
                    return '*'
                  }
                }).join('')}</td>

                {/* <td>{el.lastName}</td> */}

                <td>{el.age}</td>
                <td>{el.gender}</td>
                <td className='text-center'>
                  <img src={el.image} className="user-photo" />
                </td>
                <td>
                  <Button 
                    onClick={() => navigate('/edit/' + el.id)} 
                    variant="warning" 
                    className='action-button'
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={() => handleDelete(el.id)} 
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <div className="pagination">
        {renderPageNumbers()}
      </div>
    </>
  )
}

export default MainTable
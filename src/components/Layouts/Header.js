import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

const Header = ({ setTags }) => {
    const navigate = useNavigate();
    const user = useUser();
    console.log(user.user);
    const tags = document.getElementById('explore');
    function explore() {
        let tagsToString;
        if (tags.value) {
            tagsToString = tags.value.split(',').map(tag => tag.trim()).join('+');
            document.getElementById('explore').value = '';
            console.log(tagsToString);
            setTags(tagsToString);
            navigate('/explore');
        } else {
            return;
        }
        console.log(tagsToString);
    }
    return (
        <div className="container">
            <h1 className="header center orange-text">Start Reading For Cheap</h1>
            <div className="row center">
                <h5 className="header col s12 light">A modern way to get rid of your old books and make room for "NEW" ones</h5>
            </div>
            {user.user && <>
                <div className="row center">
                    <input type="text" id="explore" name="Explore" placeholder="Explore In Google Api Books By Key Words Separeted By Comma (,)" />
                </div>
                <div className="row center">
                    <button type='button' id="explore-button" onClick={explore} className="btn-large waves-effect waves-light orange">Explore</button>
                </div>
            </>}
        </div>
    )
}

export default Header
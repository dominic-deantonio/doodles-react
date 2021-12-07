import Doodle from "../../doodle";
import Title from "../../title";

function FavoritesView(props) {
    const { favorites } = props;

    return (
        <>
            <Title text={`Favorites (${favorites.length})`} color={'alert-danger'} />
            <div className='d-flex flex-row flex-wrap justify-content-center'>
                {favorites.map((fav, i) => {
                    fav.isFavorite = true;
                    return <Doodle
                        doodle={fav}
                        key={i}
                        {...props}
                    />
                })}

            </div>
            {favorites.length === 0 && <p>You have not added any favorites</p>}
        </>
    );
}

export default FavoritesView;
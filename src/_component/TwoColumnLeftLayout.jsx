import CategoryList from './CategoryList';

function TwoColumnLeftLayout() {
    return (
        <div className="container-fluid flex-grow-1 py-3">
            <div className="row">
                {/* Left Column */}
                <div className="col-md-3">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Left Column</h5>
                            <p className="card-text">This is the left column content.</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Main Content</h5>
                            <p className="card-text">This is the main content area.</p>
                            <CategoryList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TwoColumnLeftLayout;
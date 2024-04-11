function OneColumnLayout() {
    return (
        <div className="container-fluid flex-grow-1 py-3">
            <div className="row">
                <div className="col-md-12 ">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Main Content</h5>
                            <p className="card-text">This is the main content area.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OneColumnLayout;
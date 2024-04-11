function FooterLayout() {
    return (
        <footer className="bg-dark py-3">
            <p className="text-white text-center">
                &copy; {new Date().getFullYear()} My Website
            </p>
        </footer>
    );
}

export default FooterLayout;
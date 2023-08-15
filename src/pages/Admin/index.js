function Admin() {
    return (
        <div>
            <nav>
                <div class="logo-name">
                    <div class="logo-image">
                        <img src="./Images/cat-ocean-eyes-xh-1920x1080.jpg" alt="" />
                    </div>

                    <span class="logo_name">Movies</span>
                </div>

                

                <div class="menu-items">
                    <ul class="nav-links">
                        <li>
                            <a href="/">
                                <i class="uil uil-estate"></i>
                                <span class="link-name">User</span>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <i class="uil uil-files-landscapes"></i>
                                <span class="link-name">Product</span>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <i class="uil uil-chart"></i>
                                <span class="link-name">Order</span>
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <i class="uil uil-thumbs-up"></i>
                                <span class="link-name">Category</span>
                            </a>
                        </li>
                    </ul>

                    <ul class="logout-mode">
                        <li>
                            <a href="/">
                                <i class="uil uil-signout"></i>
                                <span class="link-name">Logout</span>
                            </a>
                        </li>

                        <li class="mode">
                            <a href="/">
                                <i class="uil uil-moon"></i>
                                <span class="link-name">Dark Mode</span>
                            </a>

                            <div class="mode-toggle">
                                <span class="switch"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

            

            <section class="dashboard">
                <div class="top">
                    <i class="uil uil-bars sidebar-toggle"></i>

                    <div class="search-box">
                        <i class="uil uil-search"></i>
                        <input type="text" placeholder="Search here..." />
                    </div>

                    <img src="images/profile.jpg" alt="" />
                </div>

                <div class="dash-content">
                    <div class="activity">
                        <div class="title">
                            <i class="uil uil-clock-three"></i>
                            <span class="text">Recent Activity</span>
                        </div>

                        <div class="activity-data">
                            <div class="data names">
                                <span class="data-title">Name</span>
                                <span class="data-list">Prem Shahi</span>
                            </div>
                            <div class="data email">
                                <span class="data-title">Email</span>
                                <span class="data-list">premshahi@gmail.com</span>
                            </div>
                            <div class="data joined">
                                <span class="data-title">Joined</span>
                                <span class="data-list">2022-02-12</span>
                            </div>
                            <div class="data type">
                                <span class="data-title">Type</span>
                                <span class="data-list">New</span>
                            </div>
                            <div class="data status">
                                <span class="data-title">Status</span>
                                <span class="data-list">Liked</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Admin;

"use client";
import Notify from "@/components/Notify";
import ProfileBtn from "@/components/ProfileBtn";
const Community = () => {
    return (
        <div className="community-content">
            <div className="selective-content">
                <div className="dasNav">
                    <h1>COMMUNITY BLOG</h1>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="search-input"
                        />
                    </div>
                    <div className="userInfo">
                        <Notify></Notify>
                        <ProfileBtn></ProfileBtn>
                    </div>  
                </div>
                <div className="post-head">
                    <h1>Popular Post</h1>
                    <span>Ideas, trends, and inspiration for a brighter future Travel</span>
                    <div className="post-pattern">
                        <div className="post-pattern-single">
                            <div className="post-img">
                                <img src="#" alt="" />
                            </div>
                            <div className="post-info">
                                <h2>Title Default</h2>
                                <div className="post-user">
                                    <div className="post-user-info">
                                        <div className="profile-img">
                                            <img src="#" alt="" />
                                        </div>
                                        <span>Username</span>
                                    </div>
                                    <div className="post-user-date">
                                        <span>Nov 27, 2024</span>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="post-pattern-multi">
                            <div className="post-pattern-multi-1">
                                <div className="post-img">
                                    <img src="#" alt="" />
                                </div>
                                <div className="post-info">
                                    <h2>Title Default</h2>
                                    <div className="post-user">
                                        <div className="post-user-info">
                                            <div className="profile-img">
                                                <img src="#" alt="" />
                                            </div>
                                            <span>Username</span>
                                        </div>
                                        <div className="post-user-date">
                                            <span>Nov 27, 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="post-pattern-multi-2">
                                <div className="post-img">
                                    <img src="#" alt="" />
                                </div>
                                <div className="post-info">
                                    <h2>Title Default</h2>
                                    <div className="post-user">
                                        <div className="post-user-info">
                                            <div className="profile-img">
                                                <img src="#" alt="" />
                                            </div>
                                            <span>Username</span>
                                        </div>
                                        <div className="post-user-date">
                                            <span>Nov 27, 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="scroll-down">
                    <div className="container_mouse">
                        <span className="mouse-btn">
                            <span className="mouse-scroll"></span>
                        </span>
                        {/* <span>Scroll Down</span> */}
                    </div>

                </div>
                <div className="post-tail">
                    <h1>Trending Post</h1>
                    <span>Journey within us with a spiritual touch</span>
                    <div className="trending-post">
                        <div className="default-load">
                            <img src="default-Search.png" alt="load" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Community;
import Link from "next/link";
import {useSpring, animated} from "react-spring";
import {Title} from "../utils/use-title";
const calc = (x, y) => [x - window.innerWidth / 4, y - window.innerHeight / 4];
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 2}px,${y / 2}px,0)`;

export default function Custom404() {
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: {mass: 10, tension: 550, friction: 140},
  }));
  return (
    <>
      <Title
        title="Page Not Found - ProsPecat"
        content="Prospecat is a platform to find verified email addresses and build a quality Data for your sales funnel."
      />
      <div className="m-4">
        <div className="grid-404">
          <div className="section-content">
            <div className="d-flex flex-column margin-top-8">
              <h1 className="content-title text-center text-info justify-content-center align-items-center">
                404 <span className="font-weight-bold text-warning">Not</span>{" "}
                Found
              </h1>
              <p className="lead text-center justify-content-center align-items-center">
                Maybe this page is sleeping 😴?Got deleted?is hiding out in{" "}
                <strong className="text-danger font-weight-bold">
                  quarantine
                </strong>{" "}
                ?Or probably never existed in the first place?
              </p>
              <div className="text-center justify-content-center align-items-center">
                <Link href="/">
                  <input
                    type="button"
                    className="navbar-btn buttonText"
                    value="Back Home"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="section-icon">
            <div className="main-404 mr-4 container ">
              <div
                className="container-404 mr-4 d-flex "
                onMouseMove={({clientX: x, clientY: y}) =>
                  set({xy: calc(x, y)})
                }
              >
                <animated.div
                  className="card1 align-items-center justify-content-center"
                  style={{transform: props.xy.interpolate(trans1)}}
                />
                <animated.div
                  className="card2 align-items-center justify-content-center"
                  style={{transform: props.xy.interpolate(trans2)}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

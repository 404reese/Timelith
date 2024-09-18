import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About Page",
  description: "About description",
};

const AboutPage = () => {
  return (
    <div className={styles.heroCont}>
      <h1 className={styles.middleTitle}>Build by</h1>
      <div className={styles.teamContainer}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 40px 20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)', /* glass morphism background */
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            marginRight: '20px',
          }}>
            <Image src="/rid.jpg" alt="" width={200} height={200} style={{
              borderRadius: '50%',
              marginBottom: '20px'
            }} />
            <h2 style={{
              textAlign: 'center',
              fontSize: '24px',
              marginBottom: '10px',
              color: '#fff',
              fontWeight: 'bold',
            }}>Riddhesh C</h2>
            <p style={{
              textAlign: 'center',
              fontSize: '18px',
              color: '#fff',
              marginBottom: '20px'
            }}>Project Lead</p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <a href="https://github.com/404reese" target="_blank" style={{ marginRight: '10px' }}>
                <Image src="/github.png" alt="GitHub" width="30" height="30" />
              </a>
              <a href="https://riddhesh.vercel.app/" target="_blank" style={{ marginRight: '10px' }}>
                <Image src="/web.png" alt="Website" width="33" height="33" />
              </a>
              <a href="https://www.linkedin.com/in/riddheshchaudhary/" target="_blank" style={{ marginRight: '10px' }}>
                <Image src="/linkedin.png" alt="LinkedIn" width="30" height="30" />
              </a>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 40px 20px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)', 
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <Image src="/dinocat99.jpeg" alt="" width={200} height={200} style={{
              borderRadius: '50%',
              marginBottom: '20px'
            }} />
            <h2 style={{
              textAlign: 'center',
              fontSize: '24px',
              marginBottom: '10px',
              color: '#fff',
              fontWeight: 'bold', 
            }}>Arpit B</h2>
            <p style={{
              textAlign: 'center',
              fontSize: '18px',
              color: '#fff', 
              marginBottom: '20px'
            }}>Project Lead</p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <a href="https://github.com/404reese" target="_blank" style={{ marginRight: '10px' }}>
                <Image src="/github.png" alt="GitHub" width="30" height="30" />
              </a>
              <a href="https://riddhesh.vercel.app/" target="_blank" style={{ marginRight: '10px' }}>
                <Image src="/web.png" alt="Website" width="33" height="33" />
              </a>
              <a href="https://www.linkedin.com/in/riddheshchaudhary/" target="_blank" style={{ marginRight: '10px' }}>
                <Image src="/linkedin.png" alt="LinkedIn" width="30" height="30" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

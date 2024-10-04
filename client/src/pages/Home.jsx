import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import './Donations.css';
import { FaEye } from 'react-icons/fa';
import Gallery from './Gallery';

const ImageModal = ({ src, alt, onClose }) => (
  <div className="modal" onClick={onClose}>
    <div className="modal-content">
      <img src={src} alt={alt} className="full-screen-image" />
      <span className="modal-close" onClick={onClose}>&times;</span>
    </div>
  </div>
);

ImageModal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const HomeAndDonations = () => {
  const scrollRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [donations] = useState([
    { _id: 1, name: 'ఎమ్ నాగరాజు ప్రసాద్ గారు (పెదపట్నం లంక)', amount: 15116, image: 'https://i.imgur.com/GDCLVOu.jpeg' },
    { _id: 2, name: 'మట్టపర్తి బాబీ గారు (ఎంట్రికోన)', amount: 5116, image: 'https://i.imgur.com/YMHxeOH.jpeg' },
    { _id: 3, name: 'వాసర్ల శ్రీనివాస్ రావు గారు (ఎంట్రికోన)', amount: 5000, image: 'https://i.imgur.com/Flc3a0x.jpeg' },
    { _id: 4, name: 'గుత్తుల శ్రీనివాస్ గారు (ఎన్. కొత్తపల్లి)', amount: 3000, image: '' },
    { _id: 5, name: 'వాసర్ల సూర్యనారాయణ గారు (ఎంట్రికోన)', amount: 1116, image: 'https://i.imgur.com/gcNtqVF.jpeg' },
    { _id: 6, name: 'విత్తనాల సత్యనారాయణ గారు  (ఎన్. కొత్తపల్లి)', amount: 1116, image: 'https://i.imgur.com/Fmroj4j.jpeg' },
  ]);

  // Function to open the modal with the clicked image
  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Automated smooth scrolling function
  useEffect(() => {
    const scrollSpeed = 1; // Amount of pixels to scroll
    const scrollInterval = 20; // Time interval (in ms) between each scroll movement

    const smoothScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'auto' }); // Reset to the beginning without smooth behavior
        } else {
          scrollRef.current.scrollBy({ left: scrollSpeed, behavior: 'smooth' }); // Scroll by 1px with smooth behavior
        }
      }
    };

    const intervalId = setInterval(smoothScroll, scrollInterval); // Smooth scrolling at intervals

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  return (
    <section className="sec1">
      {/* Image Scrolling Section */}
      <div className="image-container" ref={scrollRef}>
        <img src="/images/image latest.jpg"/>
        <img src="/images/WhatsApp Image 2024-10-02 at 22.37.07_1d18ffad.jpg"/>
        <img src="/images/temple1.jpg" alt="Temple Image 1" />
        <img src="/images/temple2.jpg" alt="Temple Image 2" />
        <img src="/images/temple3.jpg" alt="Temple Image 3" />
        <img src="/images/temple4.jpg" alt="Temple Image 4" />
        <img src="/images/temple5.jpg" alt="Temple Image 5" />
        <img src="/images/temple11.jpg" alt="Temple Image 6" />
        <img src="/images/temple1.jpg" alt="Temple Image 1" />
      </div>

      {/* About Section */}
      <div className="about-container">
      <h1 className="about-title">దుర్గామాత కథ</h1>
      
      <div className="about-content">
        <h2 className="section-title">దివ్య దృష్టి</h2>
        <p>
        అనగనగా ఒక ఊరు. పేరు చినగాడవిల్లి గరువు. ఒకప్పుడు కీ.శే.గంజా  శ్రీనివాస్ అనే వ్యక్తి ఉండేవారు. 1994లో దుర్గాదేవి అమ్మవారు  రోజూ ఆయన కలలోకి వచ్చేవారు. ఈ దివ్య దర్శనాల 
        కారణంగా దుర్గాదేవి చిత్రపటం ఉన్న అతి చిన్న కుటీరాన్ని ఏర్పాటు చేశారు.
        </p>

        <h2 className="section-title">ది సైక్లోన్</h2>
        <p>
        1996లో తుఫాను కారణంగా ఆలయం పూర్తిగా నేలమట్టమైంది. కొన్ని నెలల పాటు గ్రామస్తుల ఆలయాన్ని అలా శిధిలావస్థలో వదిలేయడంతో అమ్మవారు అదే భక్తునికి కలలో కనిపించి చెప్పడం జరిగింది. గ్రామస్తులు అనేక ఇబ్బందులు ఎదుర్కొన్నప్పటికీ , ఈసారి తాటి ఆకులతో గుడిసెను పునర్నిర్మించి పూజలు మరియు దసరా ఉత్సవాలు జరపడం మొదలుపెట్టారు.
        </p>

        <h2 className="section-title">శాశ్వత ఆలయాన్ని నిర్మించడం</h2>
        <p>
        2003లో గ్రామ పెద్దలు శాశ్వతంగా ఆలయాన్ని నిర్మించేందుకు ప్రణాళిక రూపొందించారు. ఈ ప్రణాళిక శ్రీ నిమ్మకాయల జగ్గయ్య నాయుడు గారి మొదటి విరాళంతో ప్రారంభమైంది. గ్రామస్థుల సహకారంతో చివరకు ఆలయం నిర్మించబడింది.
        </p>

        <h2 className="section-title">విగ్రహాన్ని స్థాపించడం</h2>
        <p>
        శ్రీ గుత్తుల జలంధర్ గారి దంపతుల ధనసహాయంతో అమ్మవారి విగ్రహం బహుకరించబడినది.
        అక్టోబరు 23, 2004న ఈ విగ్రహాన్ని శ్రీ గుత్తుల శ్రీనివాసరావు, శ్రీమతి కామేశ్వరి దంపతుల చేతులమీదుగా అమ్మవారిని ప్రతిష్టించడం జరిగింది.అప్పటి నుండి, ప్రతి సంవత్సరం అక్టోబర్ 23 వ తేదీన అమ్మవారి పుట్టినరోజు వేడుకలు వైభవాతి వైభవంగా నిర్వహించడం జరుగుతుంది. నిత్య  ధూప దీప నైవేద్యం నిర్వహించడానికి పురోహితుని నియమించడం జరిగింది. 
        </p>

        <h2 className="section-title">దసరా వేడుకలు</h2>
        <p>
        ప్రతి సంవత్సరం గ్రామస్తులు, భక్తుల వల్ల వచ్చిన విరాళాలతో నిర్మాణ అభివృద్ధి మరియు నవరాత్రి మహోత్సవాలు జరుగుచున్నవి. కాలక్రమేణా ప్రతి సంవత్సరం దినదినాభివృద్ధి చెందుతూ అన్నదానాలు, ఏకాహ భజన కార్యక్రమాలు, దీపాలంకరణలు, శమీ పూజలు, గరగ నృత్యాలు, తీన్ మార్ డ్రమ్స్ మరియు DJ లైట్స్ & సౌండ్స్ వంటి కార్యక్రమాలతో  ఊరేగింపు వేడుకలు ఘనంగా విస్తరించాయి.
        శ్రీ విజయ దుర్గ అమ్మ వారి మహత్యం యొక్క శక్తిపై గ్రామస్తుల విశ్వాసం మరియు వారి ఉదార విరాళాల కారణంగా, ఉత్సవాలు కొత్త ఎత్తులకు చేరుకుంటున్నాయి.
        </p>

        <h2 className="section-title">అమ్మవారి మహత్యం</h2>
        <p>
        కేవలం 33 కుటుంబాలు కలిగిన ఒక చిన్న మారుమూల గ్రామం ఈ కార్యక్రమాలను ఈ విధంగా నిర్వహించగలుగుతుందంటే ఇది కేవలం శ్రీ విజయ దుర్గ అమ్మవారి మహత్యం మాత్రమే అని భక్తుల నమ్మకం. ఒకసారి విరాళం ఇచ్చిన భక్తులు ప్రతియేటా వారే ముందుకు వచ్చి అన్నదానాలు మొదలగు కార్యక్రమాలు నిర్వహించడం విశేషం! గుడి నిర్మాణానికి ఎంతో సహకరించిన గ్రామస్తులకు విరాళం ఇచ్చిన దాతలకు ధన్యవాదములు.
        
        జై విజయదుర్గ!

        </p>
      </div>
    </div>

       {/* Form to Add a New Donation */}
       <div className="payments-container">
        <h1 className="payment-header">CLICK ON THE BELOW LINK TO DONATE</h1>
        <p className="payment-instruction">Please fill out your details and upload a screenshot of your donation.</p>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfZkU9qr1AeDRZz5lKvMBjKqlJ388xrghBrG9ei6qtJViFBvw/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer" className="payment-link">Donate Now</a>
      </div>

      {/* Donations Section */}
      <div className="donations-container">
        <h2>Donations</h2>
        <table className="donations-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation._id}>
                <td>{index + 1}</td>
                <td>{donation.name}</td>
                <td>{donation.amount}</td>
                <td>
                  {donation.image && (
                    <FaEye
                      className="toggle-icon"
                      onClick={() => openModal(donation.image)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal src={selectedImage} alt="Donation Image" onClose={closeModal} />
      )}

      {/* Gallery Section */}
      <Gallery />
    </section>
  );
};



export default HomeAndDonations;

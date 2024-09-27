import { useForm, ValidationError } from '@formspree/react';
import './contact.css'; // Make sure to import the CSS file

function ContactForm() {
  const [state, handleSubmit] = useForm("xldrqebv"); // Replace with your actual Formspree ID

  if (state.succeeded) {
    return <p className="success-message">Thank you for your message! We will get back to you shortly.</p>;
  }

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
          <ValidationError 
            prefix="Name" 
            field="name"
            errors={state.errors}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            required
          />
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
          />
        </div>

        <button type="submit" className="submit-button" disabled={state.submitting}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;

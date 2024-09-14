const UserForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    category: '',
    preference: '',
    date: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    window.emailjs.init("PjoQYAm5Idj1Jgi1k");

  const templateParams = {
    sap_name: formData.sap_name,
    material_name: formData.material_name,
    deadline: formData.deadline,
    message: `PM group: ${formData.pm_group}\nISCC+: ${formData.iscc}`
  };

  emailjs.send("service_dqhvbmn", "template_auovcl7", templateParams)
  .then((result) => {
    setSubmitMessage('E-Mail erfolgreich gesendet!');
    setIsSubmitting(false);
  })
  .catch((error) => {
    console.error('E-Mail konnte nicht gesendet werden. Fehler:', error);
    setSubmitMessage('E-Mail konnte nicht gesendet werden.');
    setIsSubmitting(false);
  });

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
            <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Requester SAP name</label>
        <input
          id="sap_name"
          name="sap_name"
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={formData.sap_name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Material name</label>
        <input
          id="material_name"
          name="material_name"
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={formData.material_name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">PM group</label>
        <select
          id="pm_group"
          name="pm_group"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={formData.pm_group}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="Plastic">Plastic</option>
          <option value="Masterbatch">Masterbatch</option>
          <option value="Laminat">Laminat</option>
        </select>
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700">Made from renewable resources (ISCC+ certified)</span>
        <div className="mt-2 space-y-2">
          {['Yes', 'No'].map((option) => (
            <div key={option} className="flex items-center">
              <input
                id={option}
                name="iscc"
                type="radio"
                required
                value={option}
                checked={formData.iscc === option}
                onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor={option} className="ml-3 block text-sm font-medium text-gray-700">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Deadline</label>
        <input
          id="deadline"
          name="deadline"
          type="date"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={formData.deadline}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>

      {submitMessage && <p className="mt-4 text-center text-sm text-gray-600">{submitMessage}</p>}
    </form>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-5 text-center">Material request</h1>
          <UserForm />
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
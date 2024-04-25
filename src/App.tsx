import "./App.css";
import NewMakeForm from "./components/new-make-form";

function App() {
  async function handleSubmit(formData: FormData) {
    await fetch("/", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <div className="flex flex-col gap-4 p-4 h-screen items-center justify-center">
        <NewMakeForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default App;

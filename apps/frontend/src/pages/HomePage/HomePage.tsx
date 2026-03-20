import { Link } from "react-router-dom";
import HomePageHelmet from "./HomePageHelmet";
import { useGetFormsQuery } from "@/services/formApi";
import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { useEffect } from "react";
import { setForms } from "@/features/forms/formsSlice";

const Homepage = () => {
  const dispatch = useAppDispatch();
  const forms = useAppSelector((state) => state.forms.forms);
  const { data, isLoading, error } = useGetFormsQuery();

  useEffect(() => {
    if (data?.forms) {
      dispatch(setForms(data.forms));
    }
  }, [data, dispatch]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading forms
      </div>
    );

  return (
    <>
      <HomePageHelmet />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
              My Forms
            </h1>
            <Link
              to="/forms/new"
              className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
            >
              Create New Form
            </Link>
          </div>
          {forms.length === 0 ? (
            <p className="text-gray-500 text-center mt-12">
              No forms created yet. Click "Create New Form" to get started!
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {forms.map((form) => (
                <div
                  key={form.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {form.title}
                    </h2>
                    {form.description && (
                      <p className="text-gray-600 text-sm mb-4">
                        {form.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-auto flex flex-col sm:flex-row gap-2">
                    <Link
                      to={`/forms/${form.id}/fill`}
                      className="flex-1 text-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      View Form
                    </Link>
                    <Link
                      to={`/forms/${form.id}/responses`}
                      className="flex-1 text-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                    >
                      View Responses
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Homepage;

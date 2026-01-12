import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Save, Eye, Wand2, Plus, Trash2, MoveUp, MoveDown } from 'lucide-react';
import axios from 'axios';

interface Section {
  id: string;
  type: string;
  content: any;
  aiGenerated?: boolean;
}

export function LandingPageBuilder() {
  const [step, setStep] = useState<'prompt' | 'build'>('prompt');
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  // Prompt step state
  const [businessType, setBusinessType] = useState('');
  const [productName, setProductName] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [mainGoal, setMainGoal] = useState('leads');
  const [features, setFeatures] = useState<string[]>(['']);

  // Build step state
  const [landingPage, setLandingPage] = useState<any>(null);
  const [sections, setSections] = useState<Section[]>([]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const response = await axios.post(
        '/api/v1/landing-pages/generate',
        {
          businessType,
          productName,
          targetAudience,
          mainGoal,
          features: features.filter(f => f.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setLandingPage(response.data);
      setSections(response.data.sections);
      setStep('build');
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setGenerating(false);
    }
  };

  const addSection = (type: string) => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      type,
      content: {},
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < sections.length) {
      [newSections[index], newSections[targetIndex]] =
      [newSections[targetIndex], newSections[index]];
      setSections(newSections);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(
        '/api/v1/landing-pages',
        {
          ...landingPage,
          sections,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      navigate('/landing-pages');
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  if (step === 'prompt') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-10 h-10 text-purple-600" />
              <div>
                <h1 className="text-3xl font-bold">Create Landing Page with AI</h1>
                <p className="text-gray-600">
                  Describe your product and let AI create a complete landing page
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type
                </label>
                <input
                  type="text"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="e.g., SaaS, E-commerce, Agency, Course"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product/Service Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., TaskMaster Pro, Fast Shipping, Web Design Services"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g., Small business owners, Developers, Fitness enthusiasts"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Goal
                </label>
                <select
                  value={mainGoal}
                  onChange={(e) => setMainGoal(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="leads">Generate Leads</option>
                  <option value="sales">Drive Sales</option>
                  <option value="signups">Get Sign-ups</option>
                  <option value="downloads">App Downloads</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Features (optional)
                </label>
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...features];
                        newFeatures[index] = e.target.value;
                        setFeatures(newFeatures);
                      }}
                      placeholder={`Feature ${index + 1}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {features.length > 1 && (
                      <button
                        onClick={() => setFeatures(features.filter((_, i) => i !== index))}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setFeatures([...features, ''])}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  + Add Feature
                </button>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating || !businessType || !productName || !targetAudience}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating Your Landing Page...
                  </>
                ) : (
                  <>
                    <Wand2 size={24} />
                    Generate Landing Page with AI
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold">{landingPage?.name || 'Landing Page'}</h1>
          <p className="text-sm text-gray-500">Editing • Auto-saved</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Eye size={20} />
            Preview
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Save size={20} />
            Save & Publish
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6 h-screen overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Add Section</h2>
          <div className="space-y-2">
            {['hero', 'features', 'testimonials', 'pricing', 'cta', 'faq', 'stats'].map(type => (
              <button
                key={type}
                onClick={() => addSection(type)}
                className="w-full px-4 py-3 text-left border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 capitalize"
              >
                <Plus size={16} className="inline mr-2" />
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Main editor */}
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-4">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-purple-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold capitalize">{section.type}</h3>
                    {section.aiGenerated && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        AI Generated
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveSection(index, 'up')}
                      disabled={index === 0}
                      className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
                    >
                      <MoveUp size={18} />
                    </button>
                    <button
                      onClick={() => moveSection(index, 'down')}
                      disabled={index === sections.length - 1}
                      className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
                    >
                      <MoveDown size={18} />
                    </button>
                    <button
                      onClick={() => removeSection(section.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Section content preview */}
                <div className="text-sm text-gray-600">
                  <pre className="whitespace-pre-wrap">
                    {JSON.stringify(section.content, null, 2)}
                  </pre>
                </div>
              </div>
            ))}

            {sections.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p>No sections yet. Add sections from the sidebar.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

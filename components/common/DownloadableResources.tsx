/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';

interface DownloadableResource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'template' | 'checklist' | 'example' | 'guide';
  size: string;
  downloadUrl?: string;
  previewContent?: string;
}

interface DownloadableResourcesProps {
  resources: DownloadableResource[];
  moduleTitle?: string;
}

const DownloadableResources: React.FC<DownloadableResourcesProps> = ({
  resources,
  moduleTitle = 'Module Resources'
}) => {
  const [previewResource, setPreviewResource] = useState<DownloadableResource | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'template': return '📋';
      case 'checklist': return '✅';
      case 'example': return '💡';
      case 'guide': return '📖';
      default: return '📁';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-800 border-red-200';
      case 'template': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'checklist': return 'bg-green-100 text-green-800 border-green-200';
      case 'example': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'guide': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDownload = (resource: DownloadableResource) => {
    if (resource.downloadUrl) {
      // In a real implementation, this would trigger a download
      window.open(resource.downloadUrl, '_blank');
    } else {
      // Mock download - in real implementation, this would generate/serve the file
      const blob = new Blob([resource.previewContent || 'Sample content'], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resource.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handlePreview = (resource: DownloadableResource) => {
    setPreviewResource(resource);
  };

  return (
    <div className="bg-background border border-border p-6 mb-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2 text-text-primary font-mono uppercase flex items-center">
          📚 {moduleTitle}
        </h3>
        <p className="text-text-secondary">
          Download helpful resources, templates, and examples to support your learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{getTypeIcon(resource.type)}</span>
                <span className={`px-2 py-1 text-xs rounded-full border ${getTypeColor(resource.type)}`}>
                  {resource.type.toUpperCase()}
                </span>
              </div>
              <span className="text-xs text-text-muted">{resource.size}</span>
            </div>
            
            <h4 className="font-semibold text-text-primary mb-2">{resource.title}</h4>
            <p className="text-sm text-text-secondary mb-4 line-clamp-3">{resource.description}</p>
            
            <div className="flex gap-2">
              {resource.previewContent && (
                <button
                  onClick={() => handlePreview(resource)}
                  className="flex-1 btn-secondary py-2 px-3 text-sm"
                >
                  👁️ Preview
                </button>
              )}
              <button
                onClick={() => handleDownload(resource)}
                className="flex-1 btn-primary py-2 px-3 text-sm"
              >
                ⬇️ Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg max-w-4xl max-h-[80vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h4 className="font-semibold text-text-primary">
                {getTypeIcon(previewResource.type)} {previewResource.title}
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(previewResource)}
                  className="btn-primary py-1 px-3 text-sm"
                >
                  ⬇️ Download
                </button>
                <button
                  onClick={() => setPreviewResource(null)}
                  className="btn-secondary py-1 px-3 text-sm"
                >
                  ✕ Close
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <pre className="whitespace-pre-wrap text-sm text-text-secondary font-mono">
                {previewResource.previewContent || 'Preview not available for this resource.'}
              </pre>
            </div>
          </div>
        </div>
      )}

      {resources.length === 0 && (
        <div className="text-center py-8 text-text-muted">
          <span className="text-4xl mb-2 block">📁</span>
          <p>No downloadable resources available for this module yet.</p>
        </div>
      )}
    </div>
  );
};

export default DownloadableResources;
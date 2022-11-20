import {useState, useMemo } from 'react';
import CreateCampaignForm from './CreateCampaignForm/CreateCampaignForm';


function CreateCampaign() {
  const [campaign, setCampaign] = useState({
  
  });

  const [preview, setPreview] = useState(false);
  const value = useMemo(() => ({ campaign, setCampaign}), [campaign]);
  const previewButton = useMemo(() => ({ preview, setPreview }), [preview]);

  return (
    
      <CreateCampaignForm />
  );
}
export default CreateCampaign

import React from 'react';
import { Event, EventFormData } from '@/models/EventModel';
import { Form } from '@/components/ui/form';
import { ImageUploadDialog } from '@/components/hotel/form/shared';
import { categories } from './form/eventFormSchema';
import EventImageGallery from './form/EventImageGallery';
import EventBasicInfoFields from './form/EventBasicInfoFields';
import EventDateTimePicker from './form/EventDateTimePicker';
import EventTypeSelector from './form/EventTypeSelector';
import EventLocationFields from './form/EventLocationFields';
import { EventPricingInventory } from './form/pricing';
import FormWrapper from './form/FormWrapper';
import FormActions from './form/FormActions';
import { useEventForm } from './form/useEventForm';

interface EventFormProps {
  initialData?: Event;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading 
}) => {
  const {
    form,
    startDate,
    endDate,
    hasTime,
    eventImages,
    showImageUploadDialog,
    setStartDate,
    setEndDate,
    setShowImageUploadDialog,
    handleAddImage,
    handleRemoveImage,
    handleSelectMultipleImages,
    setMainImage,
    handleTimeToggle,
    handleFormSubmit
  } = useEventForm(initialData, onSubmit);

  const isEditing = !!initialData;

  return (
    <FormWrapper 
      initialData={initialData} 
      onSubmit={onSubmit} 
      onCancel={onCancel} 
      isLoading={isLoading}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-4 px-6">
            {isEditing ? (
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-4">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  <strong>Note:</strong> For existing events, you can only modify the availability of tickets and extend the end date.
                </p>
              </div>
            ) : null}
            
            <EventImageGallery 
              images={eventImages}
              mainImageUrl={form.getValues('image')}
              onAddImages={() => setShowImageUploadDialog(!isEditing && true)}
              onRemoveImage={!isEditing ? (imageId) => handleRemoveImage(imageId) : undefined}
              onSetMainImage={!isEditing ? setMainImage : undefined}
              readOnly={isEditing}
            />

            <EventBasicInfoFields form={form} readOnly={isEditing} />

            <EventDateTimePicker 
              form={form}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              handleTimeToggle={handleTimeToggle}
              isEditing={isEditing}
            />

            <EventTypeSelector 
              form={form}
              categories={categories}
              readOnly={isEditing}
            />

            <EventLocationFields form={form} readOnly={isEditing} />

            <EventPricingInventory form={form} />
          </div>

          <FormActions onCancel={onCancel} isLoading={isLoading} />
        </form>
      </Form>

      <ImageUploadDialog
        isOpen={showImageUploadDialog && !isEditing}
        onClose={() => setShowImageUploadDialog(false)}
        onAddImage={handleAddImage}
        itemLabel="Event"
        multiSelect={true}
        onSelectMultiple={handleSelectMultipleImages}
      />
    </FormWrapper>
  );
};

export default EventForm;

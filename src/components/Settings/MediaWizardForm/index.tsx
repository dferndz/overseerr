import Button from '@app/components/Common/Button';
import globalMessages from '@app/i18n/globalMessages';
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';
import { type MediaWizardSettings } from '@server/lib/settings';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { defineMessages, useIntl } from 'react-intl';
import * as Yup from 'yup';

const messages = defineMessages({
  validationNameRequired: 'You must provide a server name',
  validationHostRequired: 'You must provide a server host',
  serverName: 'Media Wizard server name',
  serverHost: 'Media WIzard server host',
});

interface MediaWizardFormProps {
  onSave: () => void;
  mediawizard: MediaWizardSettings | null;
}

const MediaWizardForm = ({ mediawizard, onSave }: MediaWizardFormProps) => {
  const intl = useIntl();

  const MediaWizardSettingsSchema = Yup.object().shape({
    name: Yup.string().required(
      intl.formatMessage(messages.validationNameRequired)
    ),
    host: Yup.string().required(
      intl.formatMessage(messages.validationHostRequired)
    ),
  });

  return (
    <Formik
      initialValues={{
        name: mediawizard?.name,
        host: mediawizard?.host,
      }}
      validationSchema={MediaWizardSettingsSchema}
      onSubmit={async (values) => {
        const submission = {
          name: values.name,
          host: values.host,
        };
        await axios.put('/api/v1/settings/mediawizard', submission);
        onSave();
      }}
    >
      {({ errors, touched, setFieldValue, isSubmitting, isValid }) => {
        return (
          <Form className="section">
            <div className="mb-6">
              <div className="form-row">
                <label htmlFor="name" className="text-label">
                  {intl.formatMessage(messages.serverName)}
                </label>
                <div className="form-input-field">
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('name', e.target.value);
                    }}
                  />
                </div>
                {errors.name &&
                  touched.name &&
                  typeof errors.name === 'string' && (
                    <div className="error">{errors.name}</div>
                  )}
              </div>
              <div className="form-row">
                <label htmlFor="host" className="text-label">
                  {intl.formatMessage(messages.serverHost)}
                </label>
                <div className="form-input-field">
                  <Field
                    id="host"
                    name="host"
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('host', e.target.value);
                    }}
                  />
                </div>
                {errors.host &&
                  touched.host &&
                  typeof errors.host === 'string' && (
                    <div className="error">{errors.host}</div>
                  )}
              </div>
              <div className="actions">
                <div className="flex justify-start">
                  <span className="ml-3 inline-flex rounded-md shadow-sm">
                    <Button
                      buttonType="primary"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                    >
                      <ArrowDownOnSquareIcon />
                      <span>
                        {isSubmitting
                          ? intl.formatMessage(globalMessages.saving)
                          : intl.formatMessage(globalMessages.save)}
                      </span>
                    </Button>
                  </span>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MediaWizardForm;

export default {
  name: 'companiesPlan',
  type: 'object',
  fields: [
    {
      title: 'Plan',
      type: 'string',
      name: 'planName',
    },
    {
      title: 'Wealth Platform Access',
      name: 'wealthPlatformAccess',
      validation: (Rule) => Rule.max(2).min(0).warning('Valid values - 0, 1, 2'),
      type: 'number',
      description:
        'Select a value from 0 to 2 where 0 is available with a dark green background, 1 is available with a light green background, 2 is not available',
    },
    {
      title: 'Advanced Health Care Directive',
      name: 'advancedHealth',
      validation: (Rule) => Rule.max(2).min(0).warning('Valid values - 0, 1, 2'),
      type: 'number',
      description:
        'Select a value from 0 to 2 where 0 is available with a dark green background, 1 is available with a light green background, 2 is not available',
    },
    {
      title: 'Durable Power of Attorney',
      name: 'durablePower',
      validation: (Rule) => Rule.max(2).min(0).warning('Valid values - 0, 1, 2'),
      type: 'number',
      description:
        'Select a value from 0 to 2 where 0 is available with a dark green background, 1 is available with a light green background, 2 is not available',
    },
    {
      title: 'Guardianship Nomination',
      name: 'guardianshipNomination',
      validation: (Rule) => Rule.max(2).min(0).warning('Valid values - 0, 1, 2'),
      type: 'number',
      description:
        'Select a value from 0 to 2 where 0 is available with a dark green background, 1 is available with a light green background, 2 is not available',
    },
    {
      title: 'Last Will & Testament',
      name: 'lastWill',
      validation: (Rule) => Rule.max(2).min(0).warning('Valid values - 0, 1, 2'),
      type: 'number',
      description:
        'Select a value from 0 to 2 where 0 is available with a dark green background, 1 is available with a light green background, 2 is not available',
    },
    {
      title: 'Revocable Trust & Pourover Will',
      name: 'revocableTrust',
      validation: (Rule) => Rule.max(2).min(0).warning('Valid values - 0, 1, 2'),
      type: 'number',
      description:
        'Select a value from 0 to 2 where 0 is available with a dark green background, 1 is available with a light green background, 2 is not available',
    },
  ],
};

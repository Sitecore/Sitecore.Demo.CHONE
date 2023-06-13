const updateTagChannel = (tag: string, sourceBranch: string): string => {
  const tagSegments = tag.split('-');
  const newChannel = sourceBranch === 'main' ? 'stable' : 'nightly';

  return `${tagSegments[0]}-${newChannel}-${tagSegments[2]}`;
};

export default updateTagChannel;

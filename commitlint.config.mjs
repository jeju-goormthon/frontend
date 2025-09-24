export default {
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[\s*#(\d+)\s*\]\s*(Feat|Fix|Chore|Style|Docs|Refactor|Test):\s(.+)$/u,
      headerCorrespondence: ['issue', 'type', 'subject'],
    },
  },
  rules: {
    'type-enum': [2, 'always', ['Feat', 'Fix', 'Chore', 'Style', 'Docs', 'Refactor', 'Test']],
    'type-case': [2, 'always', 'pascal-case'], // Type은 PascalCase
    'subject-empty': [2, 'never'], // subject는 비워두면 안 됨
    'type-empty': [2, 'never'], // type도 반드시 필요
    'subject-case': [0], // subject는 자유롭게
    'header-max-length': [2, 'always', 100], // 전체 길이 100자 제한
  },
};

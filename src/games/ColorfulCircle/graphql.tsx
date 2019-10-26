import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export const MUTATION_CREATE_ANALYSIS = gql`
    mutation CreateAnalysis($data: AnalysisInput!) {
        createAnalysis(data: $data) {
            gameId
            scores
        }
    }
`;

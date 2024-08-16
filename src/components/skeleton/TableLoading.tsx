import Skeleton from 'react-loading-skeleton'; // Import Skeleton component
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton CSS

interface LoadingSkeletonProps {
    number: number
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ number }) => {
    // Skeleton loader for the table rows
    return <>
        {
            Array.from({ length: number }).map((_, index) => (
                <tr key={index} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Skeleton width={50} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Skeleton width={150} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                        <Skeleton circle width={20} height={20} />
                        <Skeleton circle width={20} height={20} style={{ marginLeft: 10 }} />
                    </td>
                </tr>
            ))
        }
    </>
}

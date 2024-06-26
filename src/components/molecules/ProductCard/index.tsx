import React from 'react';

//components
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, Image} from 'react-native';

//hooks
import useTheme from '../../../hooks/useTheme';

//utils
import {IProduct} from '@/store/@types';

interface IProductCardProps extends IProduct {
  onCardPress: () => void;
}

const ProductCard: React.FC<IProductCardProps> = props => {
  //props
  const {name, images, thumbnail, price} = props;

  //hooks
  const {Colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={() => props.onCardPress()}
      activeOpacity={0.8}
      style={{
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        width: 185,
        height: 210,
        borderWidth: 1,
        borderRadius: 16,
        borderColor: Colors.secondary[200],
        marginBottom: 12,
        minWidth: '48%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{width: 160, height: 100}}
        source={{
          uri: `${thumbnail as any}`,
        }}
        resizeMode="cover"
      />
      <Text
        numberOfLines={1}
        style={{
          fontSize: 14,
          textAlign: 'center',
          fontWeight: 'bold',
          color: Colors.secondary[500],
          marginTop: 8,
          maxWidth: 100,
        }}>
        {name}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 12,
          textAlign: 'center',
          fontWeight: 'normal',
          color: Colors.secondary[500],
          marginTop: 8,
        }}>
        Size: {(props as any)?.size?.[0]}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 12,
          textAlign: 'center',
          fontWeight: 'bold',
          color: Colors.primary[500],
          marginTop: 8,
        }}>
        $ {price}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

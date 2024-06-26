import React from 'react';

//components
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

//hooks
import {useNavigation} from '@react-navigation/native';
import useTheme from '../../../hooks/useTheme';

//utils
import {IProduct} from '../../../store/@types';

interface IProductHorizontalCardProps extends IProduct {}

const ProductHorizontalCard: React.FC<IProductHorizontalCardProps> = props => {
  //hooks
  const {Colors} = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        //@ts-ignore
        navigation.navigate('ProductDetail' as never, {id: props?._id} as never)
      }
      activeOpacity={0.8}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        borderColor: Colors.secondary[300],
        borderWidth: 1,
        marginBottom: 16,
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 8,
        minHeight: 120,
      }}>
      <Image
        source={{uri: props.thumbnail as any}}
        style={{width: 120, height: 80}}
      />
      <View style={{maxWidth: '60%', marginLeft: 16}}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            color: Colors.secondary[600],
            fontWeight: '600',
          }}>
          {props.name}
        </Text>
        <View style={{marginTop: 8, flexDirection: 'row'}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: Colors.secondary[500],
              fontWeight: '500',
            }}>
            Giá sản phẩm
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: Colors.secondary[600],
              fontWeight: 'bold',
              marginLeft: 8,
            }}>
            {/* @ts-ignore */}${props.price?.toString().prettyMoney()}
          </Text>
        </View>
        <View style={{marginTop: 8, flexDirection: 'row'}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: Colors.secondary[500],
              fontWeight: '500',
            }}>
            Size
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: Colors.primary[500],
              fontWeight: 'bold',
              marginLeft: 8,
            }}>
            {props?.size?.[0]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductHorizontalCard;
